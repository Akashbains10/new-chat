import TopBar from "@/components/Sidebar/TopBar/TopBar";
import { delay } from "@/utils/delay";
export default async function Main() {
    await delay(3000);
    return (
        <div className="bg-slate-200 min-h-screen">
            <TopBar />
            <h3>This is an main page in parallel routes</h3>
        </div>
    )
}