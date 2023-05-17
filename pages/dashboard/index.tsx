import type {NextPage} from 'next'
import Layout from "../../business/container/views/dashboard/Component/general/Layout/layou";
import Cards from "../../business/container/views/dashboard/Component/cards/cards";
import Bienvenido from "../../business/container/views/dashboard/Component/bienvenido/bienvenid";
import Dashboard from "../../business/container/views/dashboard/dashboard";

const Home: NextPage = () => {

    return (
        <>

            <Layout>
                <Dashboard />
            </Layout>

        </>
    )
}

export default Home
