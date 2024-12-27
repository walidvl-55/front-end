import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const BlogDetails = ({ id }) => {
  const [blogPostData, setBlogPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ensure id is a number
  const postId = typeof id === "string" ? parseInt(id) : id;

  // Fetch blog post details based on ID
  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!postId) return; // Prevent API call if id is not available
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/blog-post-details/${postId}`
        );
        setBlogPostData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [postId]); // Add postId to dependency array

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading blog details: {error.message}</p>;

  // Destructure the fetched data safely
  const { blogPost, blogOverview } = blogPostData || {};
  const { small_titles = [], list_items = [] } = blogPost || {};

  // Calculate previous and next post IDs
  const prevId = postId > 1 ? postId - 1 : null; // Assuming IDs start from 1
  const nextId = postId + 1; // Adjust as necessary if you know the last ID

  return (
    <section className="blog-pg single section-padding pt-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="post">
              <div className="img">
                {blogOverview && (
                  <img
                    src={blogOverview.main_image}
                    alt={blogOverview.main_title}
                  />
                )}
              </div>
              <div className="content pt-60">
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <div className="cont">
                      <h4 className="extra-title">
                        {blogOverview?.main_title}
                      </h4>
                      <div className="spacial">
                        <p>{blogPost?.main_paragraph}</p>
                      </div>

                      {small_titles.map((smallTitle) => (
                        <div key={smallTitle.id}>
                          <h6>{smallTitle.title}</h6>
                          <p>{smallTitle.paragraph}</p>
                        </div>
                      ))}

                      <ul>
                        {list_items.map((listItem, index) => (
                          <li key={listItem.id}>
                            <span>{String(index + 1).padStart(2, "0")}</span>{" "}
                            {listItem.list_content}
                          </li>
                        ))}
                      </ul>

                      <div className="quotes text-center">
                        <p>{blogPost?.summary_paragraph}</p>
                      </div>

                      <div className="row">
                        {blogPost?.additional_image_1 && (
                          <div className="col-md-6">
                            <div className="mb-10">
                              <img
                                src={blogPost.additional_image_1}
                                alt="Additional"
                              />
                            </div>
                          </div>
                        )}
                        {blogPost?.additional_image_2 && (
                          <div className="col-md-6">
                            <div className="mb-10">
                              <img
                                src={blogPost.additional_image_2}
                                alt="Additional"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <p>
                        Falls Sie Fragen haben oder weitere Informationen
                        ben&ouml;tigen, z&ouml;gern Sie bitte nicht, uns zu
                        kontaktieren. Unser Team steht Ihnen jederzeit zur
                        Verf&uuml;gung und hilft Ihnen gerne weiter. Wir freuen
                        uns darauf, Ihnen bei Ihrem Anliegen behilflich zu sein.
                      </p>

                      <div className="share-info">
                        <div className="social">
                          <a href="#0">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                          <a href="#0">
                            <i className="fab fa-instagram"></i>
                          </a>
                        </div>
                        <div className="tags">
                          <span>
                            {new Date(
                              blogOverview.date_added
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pagination">
                <span>
                  {prevId ? (
                    <Link href={`/blog-details/${prevId}`}>
                      <a>Prev Post</a>
                    </Link>
                  ) : (
                    <span>Prev Post</span>
                  )}
                </span>
                <span className="icon">
                  <Link href={`/blog/blog-dark`}>
                    <a>
                      <i className="fas fa-th-large"></i>
                    </a>
                  </Link>
                </span>
                <span className="text-right">
                  <Link href={`/blog-details/${nextId}`}>
                    <a>Next Post</a>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
