import type {NextPage} from 'next'
import Layout from "../../business/container/general/layout/layout";
import ComprarApartamento from "../../business/container/views/comprar_apartamento/comprar_apartamento";

const Home = (props: {
    code: string,

}) => {
    return (
        <>
            <Layout>
                <ComprarApartamento/>
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
