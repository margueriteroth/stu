import React from "react"
import Layout from "components/Layout/Layout"
import MaxWidth from "components/_ui/MaxWidth/MaxWidth"
import DessertPerson from "projects/DessertPerson/DessertPerson"

const DessertPage = () => (
    <Layout className="MoviesPage">
        <MaxWidth className="">
            <DessertPerson />
        </MaxWidth>
    </Layout>
)

export default DessertPage