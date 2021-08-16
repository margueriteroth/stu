import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Feed from "components/Feed/Feed"
import Intro from "components/Intro/Intro"
import Footer from "components/Footer/Footer"
import Layout from "components/Layout/Layout"
import MaxWidth from "components/_ui/MaxWidth/MaxWidth"
import MoviesContainer from "components/Movies/MoviesContainer"
import "./index.scss"

const HomePage = ({ data }) => {
    console.log(data)
    return (
        <Layout>
            <MaxWidth size="m" className="Home">
                {/* <Intro /> */}
                {/* <div className="Home__greeting">
                    Hello! I'm Marguerite — a designer and software engineer.
                </div> */}
                <Feed />
            </MaxWidth>
        </Layout>
    )
}

export default HomePage