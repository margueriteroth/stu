const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

const BLOG_POST_FILENAME_REGEX = /([0-9]+)\-([0-9]+)\-([0-9]+)\-(.+)$/;
// For post folders with [DATE]-post-title-for-url format,
// separate name and date to isolate when making full canonical url.
// This is nice because I can organize my post folders by date,
// but not have that bleed through to the url.
exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `Mdx`) {
        if (node.internal.type === `Mdx`) {
            const slug = createFilePath({ node, getNode })

            //isolate date and post title from folder name
            const match = BLOG_POST_FILENAME_REGEX.exec(slug)

            if (match !== null) {
                const year = match[1]
                const month = match[2]
                const day = match[3]
                const filename = match[4]
                const date = new Date(year, month - 1, day)

                createNodeField({
                    name: `slug`,
                    node,
                    value: `/${filename}`,
                })

                createNodeField({
                    name: `date`,
                    node,
                    value: date.toJSON(),
                })
            } else {
                createNodeField({
                    name: `slug`,
                    node,
                    value: slug,
                })
            }
        }
    }
}


// Sample query and function for dynamically generating pages from MDX posts.
// Make sure the correct node module is installed.
//
// exports.createPages = async ({ graphql, actions }) => {
//     const { createPage } = actions
//
//
//     const blogPost = path.resolve(`src/templates/Post/Post.jsx`);
//     const blogPosts = await graphql(`
//         query {
//             allMdx(filter: {frontmatter: {type: {ne: "internal"}}, fileAbsolutePath: {regex: "/blog/"}}, sort: { fields: [frontmatter___date], order: DESC }) {
//                 edges {
//                     node {
//                         fields {
//                             slug
//                         }
//                     }
//                 }
//             }
//         }
//   `)

//     if (blogPosts.errors) {
//         throw blogPosts.errors
//     }

//     // Create work post pages.
//     const posts = blogPosts.data.allMdx.edges

//     posts.forEach((post, index) => {
//         const previous = index === posts.length - 1 ? null : posts[index + 1].node
//         const next = index === 0 ? null : posts[index - 1].node

//         createPage({
//             path: `/blog${post.node.fields.slug}`,
//             component: blogPost,
//             context: {
//                 slug: post.node.fields.slug,
//                 previous,
//                 next,
//             },
//         })
//     })
//}


// Because we need CSV for d3!!
exports.onCreateWebpackConfig = ({
    stage,
    rules,
    loaders,
    plugins,
    actions,
}) => {
    actions.setWebpackConfig({
        module: {
            rules: [
                {
                    test: /\.csv$/,
                    loader: 'csv-loader',
                    options: {
                        dynamicTyping: true,
                        header: true,
                        skipEmptyLines: true
                    }
                },
            ],
        },
        plugins: [
            plugins.define({
                __DEVELOPMENT__: stage === `develop` || stage === `develop-html`,
            }),
        ],
    })
}