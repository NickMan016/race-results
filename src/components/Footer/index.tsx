export const Footer = () => {
    const fecha = new Date();
    return (
        <footer className="py-3 w-full bg-white shadow-[0_0_6px_2px] shadow-gray-500 dark:bg-gray-900 dark:shadow-none">
            <div className="m-auto w-[90%] max-w-[1200px] grid gap-4 sm:flex sm:items-center sm:justify-between">
                <div>
                    Race Results &copy; {fecha.getFullYear()}. All rights reserved.
                </div>
                <div>
                    By NickMan016. Powered by Ergast API
                </div>
            </div>
        </footer>
    )
}