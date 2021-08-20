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
    let mdxData = data.allMdx.edges;
    console.log(mdxData)
    return (
        <Layout>
            <MaxWidth size="m" className="Home">
                {/* <Intro /> */}
                {/* <div className="Home__greeting">
                    Hello! I'm Marguerite — a designer and software engineer.
                </div> */}
                <Feed blogData={mdxData} />
            </MaxWidth>
        </Layout>
    )
}

export default HomePage;

export const pageQuery = graphql`
    query {
        allMdx(
            filter: {
                frontmatter: { type: { ne: "internal" } }
                fileAbsolutePath: { regex: "/blog/" }
            }
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        slug
                        date(formatString: "YYYY-MM-DD")
                        updates(formatString: "MMMM D, YYYY")
                        section
                        isFeatured
                    }
                }
            }
        }
    }
`
