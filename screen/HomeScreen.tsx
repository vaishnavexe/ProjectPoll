import { View, Text, FlatList, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import fetchPollingData from '../API/apiFetch';
import Paginations from '../components/Paginations';
import { TableDataLabel } from '../components/Table';
import { createShortString, parseDateStamp } from '../API/Data'

export const HomeScreen = ({ navigation }: { navigation: any }) => {
    const [data, setData] = useState<object[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const p = 20
    let counter = 0

    useEffect(() => {        
        apiCall(counter);

    const interval = setInterval(() => {
        apiCall(counter);
        }, 10000);

        return () => clearInterval(interval);
    }, [])

    const apiCall = (page: number) => {
        fetchPollingData(page)
            .then(res => {
            counter++;
            return res.hits;
     })
        .then(body => setData(prevState => [...prevState, ...body]))
        .catch(error => console.log(error))
    }

    const onPageChanged = useCallback((e: ProgressEvent, page: any) => {
        e.preventDefault();
        setCurrentPage(page);
    }, [currentPage]);

    const currentData = data.slice(
        (currentPage - 1) * p,
        (currentPage - 1) * p + p
    );

    const renderItem = ({ item }: any) => {
        const { title, url, created_at, author } = item

        const newShortTitle = createShortString(title)
        const urlDomain = url?.split('/')[2];
        const newShorAuther = createShortString(author)
        const newCreatedAt = parseDateStamp(created_at);

        return (
            <TouchableOpacity style={styles.tableContent} onPress={() => navigation.navigate('MainScreen', { item })}>
               
                <View style={styles.tableCol}>
                    <Text
                        style={styles.tableContentLink}
                        onPress={() => Linking.openURL(url)}>
                        {urlDomain ? urlDomain : 'unavailable'}
                    </Text>
                </View>
                <View style={[styles.tableCol, styles.tableFirstCol]}>
                    <Text>{newShortTitle}</Text>
                </View>
                <View style={[styles.tableCol, { alignItems: 'center' }]}>
                    <Text>{newCreatedAt}</Text>
                </View>
                <View style={[styles.tableCol, styles.tableLastCol]}>
                    <Text>{newShorAuther}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const RenderData = ({ data }: any) => {
        return (
            <FlatList
                nestedScrollEnabled
                data={currentData}
                renderItem={renderItem}
                ListFooterComponent={
                    <Paginations
                        totalRecords={data.length}
                        pageLimit={p}
                        pageNeighbours={2}
                        onPageChanged={onPageChanged}
                        currentPage={currentPage} />
                }
                keyExtractor={(item, index) => index.toString()} />
        )
    }

    return (
        <View style={styles.tableContainer}>

            <TableDataLabel
                tabelHeadings={{
                    title: "Title",
                    url: "Url",
                    createdAt: "Created At",
                    author: "Author"
                }} />

            <RenderData data={data} />

            <StatusBar style="auto" hidden />
        </View>
    )
}
const styles = StyleSheet.create({
    tableContainer: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center',
    },
    tableContent: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: '#f3f3f3',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },
    tableContentLink: {
        fontSize: 10,
        textAlign: 'center'
    },
    tableCol: {
        width: 100,
        paddingVertical: 10,
        paddingHorizontal: 2,
        borderRightColor: '#55555585',
        borderRightWidth: .5
    },
    tableFirstCol: {
        paddingLeft: 0,
        paddingRight: 5,
    },
    tableLastCol: {
        paddingRight: 0,
        paddingLeft: 5,
        borderRightColor: undefined,
        borderRightWidth: 0
    }
})