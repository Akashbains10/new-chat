import { Card, CardContent, Typography } from "@mui/material";
import { LoginComponent } from "./_login";

export default function Login() {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card elevation={5} sx={{ width: 600, marginTop: 20 }}>
                    <CardContent>
                        <h3 style={{ paddingLeft: '50px', paddingRight: '50px' }}>Login account</h3>
                        <LoginComponent />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}