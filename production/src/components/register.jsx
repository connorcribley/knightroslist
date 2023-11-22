import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Create = () => {
    return (
        <div className='Register' style={{display: 'grid', justifyContent: 'center'}}>
            <h1>Create an Account</h1>
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
                <Form.Group className="mb-3" controlId="formBasicRPassword">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control type="password" placeholder="Repeat Password" />
                </Form.Group>
                <br></br>
                <Button variant="secondary" type="submit">
                    Submit
                </Button>                
                <Button href="/" variant="secondary">Home Page</Button>
                <br></br>
                <Button href="/Login" variant="secondary">Already have an account?</Button>   
            </Form>
        </div>
    )
};

export default Create;