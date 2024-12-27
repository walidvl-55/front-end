import React from "react";
import LightTheme from "../../layouts/Light";
import NavbarFullMenu from "../../components/navbar-full-menu/navbar.full-menu";
import PageHeader from "../../components/Page-header/page-header";
import Footer from "../../components/Footer/footer";
import MyBlogList from "../../components/Upload/my-blogs";
import AddBlogForm from "../../components/Blog-overview/blog-overview-upload";
import { useRouter } from "next/router"; // Import the useRouter hook

const NewBlogLight = () => {
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(true); // Loading state
  const router = useRouter(); // Next.js router for navigation

  React.useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    const token = localStorage.getItem('authToken');

    console.log('Token:', token);

    if (!token) {
      console.log('No token found, user is not authenticated');
      router.push('/'); // Redirect to login page if no token
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/verify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Token is valid');
        setIsLoading(false); // Set loading state to false, content can now render
      } else {
        console.log('Token is invalid');
        router.push('/'); // Redirect to login page if token is invalid
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      router.push('/'); // Redirect to login page in case of error
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while token is being verified
  }

  return (
    <LightTheme>
      <div className="circle-bg">
        <div className="circle-color fixed">
          <div className="gradient-circle"></div>
          <div className="gradient-circle two"></div>
        </div>
      </div>
      <NavbarFullMenu theme="light" />
      <PageHeader
        className="sub-bg"
        title="Unsere Neuigkeiten."
        paragraph="Alle aktuellen Nachrichten und Veranstaltungen unseres kreativen Teams."
      />
      <AddBlogForm />
      <MyBlogList />
      <Footer />
    </LightTheme>
  );
};

export default NewBlogLight;
