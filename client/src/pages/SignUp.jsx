import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessages, setErrorMessages] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {  
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessages('All fields are required');
    }
    try {
      setLoading(true);
      setErrorMessages(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessages(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/signin');
      }
    } catch (error) {
      setErrorMessages(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Ashish</span>
            Shrivastav
          </Link>
          <p className="text-sm mt-5">
            This is the demo project. You can sign up to see the magic. You can use the email and password or use the google sign up button to sign up.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" onChange={handleChange}/>
            </div>
            <div>
              <Label value="Your email" />
              <TextInput type="email" placeholder="Email" id="email" onChange={handleChange}/>
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="password" placeholder="Password" id="password" onChange={handleChange}/>
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {
                loading ? (
                  <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                  </>
                ) : 'Sign Up'
              }
            </Button>
              <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account? </span>
            <Link to="/signin" className="text-purple-500 underline">
              Sign In
            </Link>
          </div>
          {
            errorMessages &&
            <Alert className="mt-5" color='failure'>
              {errorMessages}
            </Alert>  
          }
        </div>
      </div>
    </div>
  );
}
