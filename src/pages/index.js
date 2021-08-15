import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Feed from "components/Feed/Feed"
import Layout from "components/Layout/Layout"
import MaxWidth from "components/_ui/MaxWidth/MaxWidth"
import MoviesContainer from "components/Movies/MoviesContainer"
import "./index.scss"

const HomePage = () => (
    <StaticQuery
        query={FEED_QUERY}
        render={data => (
            <Layout>
                <MaxWidth size="l" className="Home">
                    <div className="Home__greeting">
                        Hello! I'm Marguerite — a designer and software
                        engineer.
                    </div>
                    <Feed />
                </MaxWidth>
            </Layout>
        )}
    />
)

export default HomePage

const FEED_QUERY = graphql`
    query {
        allMdx(
            filter: { fileAbsolutePath: { regex: "/blog/" } }
            sort: { fields: frontmatter___date, order: DESC }
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date(formatString: "MMMM D, YYYY")
                    }
                }
            }
        }
    }
`
