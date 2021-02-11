import React from "react";
import Feed from "components/Feed/Feed"
import Layout from "components/Layout/Layout"
import MaxWidth from "components/_ui/MaxWidth/MaxWidth"
import MoviesContainer from "components/Movies/MoviesContainer"

const HomePage = () => (
    <Layout>
        <MaxWidth className="">
            <div className="Home__greeting">
                Hello! I'm Marguerite — a designer and software engineer.
            </div>
            <Feed />
        </MaxWidth>

        {/* <MaxWidth className="">
            <MoviesContainer/>
        </MaxWidth> */}
    </Layout>
)

export default HomePage;