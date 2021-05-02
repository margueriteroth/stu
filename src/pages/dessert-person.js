import React from "react"
import Layout from "components/Layout/Layout"
import MaxWidth from "components/_ui/MaxWidth/MaxWidth"
import DessertPerson from "projects/DessertPerson/DessertPerson"
import './dessert-person.scss'

const DessertPage = () => (
    <Layout className="DessertPage">
        <MaxWidth size="l" className="">
            <DessertPerson />
        </MaxWidth>
    </Layout>
)

export default DessertPage
