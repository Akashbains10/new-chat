export default function DashLayout({
    children,
    chatbar,
    main,
}: Readonly<{
    children: React.ReactNode;
    chatbar: React.ReactNode;
    main: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen">
            {children}
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                    {chatbar}
                </div>
                <div className="col-span-7">
                    {main}
                </div>
            </div>
        </div>
    )
}