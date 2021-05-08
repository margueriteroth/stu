import React from "react"
import Layout from "components/Layout/Layout"
import MaxWidth from "components/_ui/MaxWidth/MaxWidth"
import DessertPerson from "projects/DessertPerson/DessertPerson"
import "./dessert-person.scss"

const DessertPage = () => (
    <Layout className="DessertPage">
        <MaxWidth size="l" className="">
            <DessertPerson />
            {/* <div className="test">
                <div style={{background: "red"}}></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div style={{background: "blue"}}></div>
                <div style={{background: "green"}}></div>
            </div>
            <div className="test">
                <div style={{borderColor: "red"}} className="label">5min</div>
                <div className="label">60min</div>
                <div className="label">1.5hr</div>
                <div className="label">2hr</div>
                <div className="label">2.5hr</div>
                <div className="label">3hr</div>
                <div className="label">3.5hr</div>
                <div className="label">4hr</div>
                <div style={{borderColor: "blue"}} className="label">6hr</div>
                <div style={{borderColor: "green"}} className="label">12hr</div>
            </div> */}
        </MaxWidth>
    </Layout>
)

export default DessertPage
