import '../App.css';
import NavBar from './nav';

function Login() {
    const handleClick = () => {
        alert("Button clicked");
    };

    return (
        <div className="App">
            <NavBar/>
            <div className='login'>
                Email<input type="text" placeholder="Enter your email" />
                <br></br>
                <br></br>
                Password<input type="password" placeholder="Enter your password" />
                <br></br>
                <br></br>

                <button type="submit" onClick={handleClick}>Submit</button>
            </div>
        </div>
    );
}

export default Login;
