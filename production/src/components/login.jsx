import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Login = () => {
    return (
        <div className='Login' style={{display: 'grid', justifyContent: 'center'}}>
            <h1 style={{paddingLeft: 80}}>Login</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <br></br>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <br></br>
                <Button variant="secondary" type="submit">
                    Submit
                </Button>
                <Button href="/" variant="secondary">Home Page</Button>
                <br></br>
                <Button href="/Register" variant="secondary">Register</Button>   
            </Form>
        </div>
    )
};

export default Login;