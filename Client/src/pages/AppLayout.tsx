import { Outlet } from "react-router-dom"

const AppLayout = () => {
    return (
        <>
            <p>banner</p>
            <p>navbar</p>
            <main className="min-h-screen">
                <Outlet />
            </main>
            <p>footer</p>
            <p>cartsidercar</p>
        </>
    )
}

export default AppLayout