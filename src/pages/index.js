import React from "react";
import Layout from "components/Layout/Layout"
import MaxWidth from "components/_ui/MaxWidth/MaxWidth"
import MoviesContainer from "components/Movies/MoviesContainer"

const MoviesPage = () => (
    <Layout>
        <MaxWidth className="">
            <MoviesContainer/>
        </MaxWidth>
    </Layout>
)

export default MoviesPage;