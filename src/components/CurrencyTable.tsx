import React, { Fragment, useState } from 'react'
import useFetch from '../hooks/useFetch'
import dayjs from 'dayjs'

type CurrencyType = {
  shortName: string
  validFrom: string
  name: string
  country: string
  move: number
  amount: number
  valBuy: number
  valSell: number
  valMid: number
  currBuy: number
  currSell: number
  currMid: number
  version: number
  cnbMid: number
  ecbMid: number
}

const WEB_API_KEY = process.env.REACT_APP_WEB_API_KEY

const url =
  'https://webapi.developers.erstegroup.com/api/csas/public/sandbox/v2/rates/exchangerates?web-api-key=' +
  WEB_API_KEY

const CurrencyTable = () => {
  const [showRawInfo, setShowRawInfo] = useState<number>(0)
  const { data, error, fetching } = useFetch<CurrencyType[]>(url)

  if (error) return <p>{error.message}</p>

  if (fetching) return <p>Loading...</p>

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ShortName</th>
          <th>Name</th>
          <th>Country</th>
          <th>Amount</th>
          <th>CurrBuy</th>
          <th>CurrMid</th>
          <th>CurrSell</th>
          <th>CnbMid</th>
          <th>EcbMid</th>
          <th>Move</th>
          <th>valBuy</th>
          <th>valMid</th>
          <th>valSell</th>
          <th>validFrom</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item: CurrencyType, index) => {
          const ifShowRawInfo = showRawInfo === index + 1
          const classNameForShowRawInfo = ifShowRawInfo ? 'raw' : undefined
          return (
            <tr key={index} className={classNameForShowRawInfo}>
              <td onClick={() => setShowRawInfo(index + 1)}>
                {item.shortName}
              </td>
              {Boolean(showRawInfo) && ifShowRawInfo && (
                <Fragment>
                  <td>{item.name}</td>
                  <td>{item.country}</td>
                  <td>{item.amount}</td>
                  <td>{item.currBuy}</td>
                  <td>{item.currMid}</td>
                  <td>{item.currSell}</td>
                  <td>{item.cnbMid}</td>
                  <td>{item.ecbMid}</td>
                  <td>{item.move}</td>
                  <td>{item.valBuy}</td>
                  <td>{item.valMid}</td>
                  <td>{item.valSell}</td>
                  <td>{dayjs(item.validFrom).format('DD.MM.YYYY')}</td>
                </Fragment>
              )}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default CurrencyTable
