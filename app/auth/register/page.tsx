import {Card, CardContent} from '@mui/material'
import RegisterComponent from './_register'

export default function Register() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Card elevation={5} sx={{ width: 600 }}>
                <CardContent>
                    <h1 className='font-semibold py-3'>Create an Account</h1>
                    <RegisterComponent/>
                </CardContent>
            </Card>
        </div>
    )
}