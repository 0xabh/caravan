import React, {useEffect, useState} from "react"
import {useBackgroundSelector} from "../../hooks";
import {getActiveAccount} from "../../../Background/redux-slices/selectors/accountSelectors";
import {getActiveNetwork} from "../../../Background/redux-slices/selectors/networkSelectors";

export const TransactionHistory = () => {
    const activeAccount = useBackgroundSelector(getActiveAccount);
    const activeNetwork = useBackgroundSelector(getActiveNetwork)
    const [data, setData] = useState<{
        sender: string,
        receiver: string,
        value: string,
        hash: string,
        chainId: number,
        date: string
    }[]>()

    useEffect(() => {
        const fetchTxn = async () => {
            if (activeAccount && activeNetwork.chainID) {
                const res = await fetch(`http://localhost:3003?sender=${activeAccount}&chainId=${activeNetwork.chainID}`)
                const data = await res.json()
                console.log(data)
                setData(data.results)
            }
        }
        fetchTxn()
    }, [activeAccount, activeNetwork]);

    return (
        <div>
            <h1>Transaction History</h1>
            {data?.length === 0 && <p>No transactions yet</p>}
            {data && <div>
                {data.map((txn, index) => {
                    return (
                        <div key={index}>
                            <p>Receiver: {txn.receiver}</p>
                            <p>Value: {txn.value}</p>
                            <p>Hash: {txn.hash}</p>
                            <p>Date: {txn.date}</p>
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}