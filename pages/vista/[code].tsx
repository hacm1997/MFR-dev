import type {NextPage} from 'next'
import Layout from "../../business/container/general/layout/layout";
import VistaApartamento from "../../business/container/views/vista_apartamento/vista_apartamento";
import React, {useEffect, useState} from "react";
import path from "path";
import Head from "next/head";
import styles from "../../business/container/general/layout/style.module.css";

const Home = (props: {
    code: string,

}) => {

    return (
        <>
            <Layout>
                <Head>
                    <title>{props.code} | Inmobiliraria MFR</title>
                </Head>
                <VistaApartamento />
            </Layout>
        </>
    )
}

export default Home

export async function getStaticPaths() {
    //const files = fs.readdirSync(path.join('posts'))

    return {
        paths: [],
        fallback: 'blocking',
    }
}

export async function getStaticProps({params: {code: any}}: never) {
    return {
        props: {
            code:any,
        },
    }
}
