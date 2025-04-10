
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
const URL = `${process.env.REACT_APP_BACKEND_URL}`;

export const stub = [{
    ID:"010...3003",
    Owner:"0Fb3...90930",
    Asset:"LAL",
    Amount:100,
    Price:20,
},
{
    ID:"010...3003",
    Owner:"0Fb3...90930",
    Asset:"KALA",
    Amount:400,
    Price:10,
},
{
    ID:"010...3003",
    Owner:"0Fb3...90930",
    Asset:"APAP",
    Amount:600,
    Price:30,
},]
export interface UseAllTransanctionsProps {
    extendedUrl?: string;
    status?: string;
    user?: string;
    limit?: number
}

const getParams = (params: UseAllTransanctionsProps): Object => {
    const params_ = {}
    const { status, user } = params
    if (status) {
        params_.status = status;
    }
    if (user) {
        params_.user = user;
    }
    return params_;

}

const URL_ = `${URL}/transactions`;
export const useAllTransanctions = ({ extendedUrl = "", limit = 10, ...rest }: UseAllTransanctionsProps) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<number>(0);
    const [data, setData] = useState<any[]>(stub);
    const [paginationData, setPaginationData] = useState<{
        page: number,
        count: number,
        rowsPerPage: number,
    }>({ page: 1, count: 1, rowsPerPage: limit });



    const fetchTransanctions = useCallback(
        debounce(async (url, page = 1, params) => {
            if (loading) return;
            setLoading(true);
            await axios
                .get(`${url + extendedUrl}`, { params: { limit, page, ...params } })
                .then((res) => {
                    console.log("res", res)
                    setData([...res?.data?.data]);

                    setPaginationData({ page: res?.data?.cp || 0, count: res?.data?.tr || 0, rowsPerPage: limit })
                })
                .catch((e) => console.log(e));
            setLoading(false);
        }, 500),
        []
    );


    useEffect(() => {
        (() => {
            // setData([])
            // fetchTransanctions(URL_, undefined, getParams(rest));
        })();
    }, [JSON.stringify(rest), fetchTransanctions]);


    useEffect(() => {
        if (page !== 0) fetchTransanctions(URL_, page, getParams(rest));
    }, [page]);

    const onChangePage = (e: any, page: any) => setPage(page);

    return { loading, data, paginationData: { onChangePage, ...paginationData } };
};
