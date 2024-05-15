import React, { useEffect, useState } from "react";
import Accordion from "../../../Components/Accordion";
import { useParams } from "react-router-dom";
import CardRelated from "./CardRelated";
import { getDetailBlogData } from "../../../utils/pageQueries/DetailBlog";
import CardAnimation from "./CardAnimation";

const LeftSide = ({ data }: any) => {
  const params = useParams();
  const [relatedBlogs, setRelatedBlogs] = useState<any>([]);
  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${process.env.REACT_APP_API}/blogs/${params.slug}`,
      "_blank"
    );
  };

  const shareToX = () => {
    window.open(
      `https://example.com/share?url=${process.env.REACT_APP_API}/blogs/${params.slug}`,
      "_blank"
    );
  };

  const shareToGitHub = () => {
    window.open(
      `https://github.com/login?return_to=${process.env.REACT_APP_API}/blogs/${params.slug}`,
      "_blank"
    );
  };

  const shareToDribbble = () => {
    window.open(
      `https://dribbble.com/session/new?return_to=${process.env.REACT_APP_API}/blogs/${params.slug}`,
      "_blank"
    );
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const _temp: any = [];
        data?.attributes?.categories?.data?.forEach((category: any) => {
          _temp.push({
            category: {
              eq: category.attributes.category,
            },
          });
        });
        const getData = await getDetailBlogData({
          filters: {
            categories: {
              or: _temp,
            },
          },
        });
        setRelatedBlogs(getData?.voyagerArticles?.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [params, data]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h3 className="text-black text-2xl lg:text-3xl font-bold">Updates</h3>
        <p className="text-gray-500 text-md lg:text-lg font-normal">
          Stay informed with our latest insights and updates
        </p>
      </div>
      <Accordion
        title="Share this update"
        content={
          <div className="flex gap-6 items-center">
            <div onClick={() => shareToFacebook()} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z"
                  fill="#4338CA"
                />
              </svg>
            </div>
            <div onClick={() => shareToX()} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.27998 9.09 5.10998 7.38 2.99998 4.79C2.62998 5.42 2.41998 6.16 2.41998 6.94C2.41998 8.43 3.16998 9.75 4.32998 10.5C3.61998 10.5 2.95998 10.3 2.37998 10V10.03C2.37998 12.11 3.85998 13.85 5.81998 14.24C5.19071 14.4122 4.53007 14.4362 3.88998 14.31C4.16158 15.1625 4.69351 15.9084 5.41099 16.4429C6.12847 16.9775 6.99543 17.2737 7.88998 17.29C6.37361 18.4904 4.49397 19.1393 2.55998 19.13C2.21998 19.13 1.87998 19.11 1.53998 19.07C3.43998 20.29 5.69998 21 8.11998 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z"
                  fill="#4338CA"
                />
              </svg>
            </div>
            <div onClick={() => shareToGitHub()} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clipPath="url(#clip0_18_4394)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 0.956787C5.74743 0.956787 0.677246 6.02585 0.677246 12.2795C0.677246 17.2824 3.92156 21.5265 8.42043 23.0239C8.98612 23.1289 9.19387 22.7782 9.19387 22.4792C9.19387 22.2092 9.18337 21.3172 9.1785 20.3711C6.0285 21.056 5.36381 19.0352 5.36381 19.0352C4.84875 17.7264 4.10662 17.3784 4.10662 17.3784C3.07912 16.6757 4.18406 16.6903 4.18406 16.6903C5.32087 16.77 5.91975 17.8571 5.91975 17.8571C6.92962 19.5877 8.56856 19.0875 9.21468 18.7984C9.31631 18.0665 9.60975 17.5669 9.93356 17.2841C7.41862 16.9982 4.77468 16.0271 4.77468 11.6885C4.77468 10.4524 5.21718 9.44229 5.9415 8.64916C5.82375 8.36416 5.43618 7.21254 6.051 5.65291C6.051 5.65291 7.00162 5.3486 9.16537 6.81354C10.0687 6.56248 11.0376 6.43629 12 6.43197C12.9619 6.43629 13.9312 6.5621 14.8363 6.81316C16.9974 5.34823 17.9469 5.65254 17.9469 5.65254C18.5632 7.21198 18.1757 8.36379 18.0581 8.64879C18.7841 9.44191 19.2234 10.452 19.2234 11.6882C19.2234 16.037 16.5746 16.9944 14.0533 17.2749C14.4596 17.6263 14.8215 18.3155 14.8215 19.3717C14.8215 20.8867 14.8084 22.106 14.8084 22.479C14.8084 22.7803 15.0124 23.1334 15.5861 23.0222C20.0824 21.5233 23.3229 17.2805 23.3229 12.2795C23.3227 6.02622 18.2531 0.956787 12 0.956787Z"
                    fill="#4338CA"
                  />
                  <path
                    d="M4.96573 17.2136C4.9408 17.2698 4.8523 17.2867 4.77167 17.2483C4.68917 17.2115 4.64323 17.1348 4.66986 17.0784C4.69423 17.0203 4.78292 17.0043 4.86486 17.0431C4.94736 17.0801 4.99423 17.1575 4.96555 17.2138L4.96573 17.2136ZM5.42436 17.7253C5.37055 17.7753 5.26498 17.7521 5.19336 17.6728C5.11911 17.594 5.10523 17.4885 5.16017 17.4376C5.21605 17.3878 5.31842 17.4114 5.39267 17.4901C5.46655 17.57 5.48117 17.6746 5.42455 17.7255L5.42436 17.7253ZM5.87098 18.3772C5.80161 18.4256 5.68798 18.3804 5.61786 18.2797C5.54848 18.1788 5.54848 18.0579 5.61973 18.0097C5.68967 17.9613 5.80161 18.005 5.87286 18.1048C5.94186 18.207 5.94186 18.3281 5.87098 18.3772ZM6.48242 19.0074C6.42055 19.0758 6.28817 19.0575 6.19142 18.9643C6.09261 18.873 6.06505 18.743 6.12711 18.6748C6.19011 18.6061 6.32305 18.6253 6.42036 18.7179C6.51917 18.809 6.54898 18.9391 6.4828 19.0072L6.48242 19.0074ZM7.32617 19.3732C7.29861 19.4619 7.17148 19.5022 7.04305 19.4643C6.91498 19.4255 6.83117 19.3218 6.85742 19.2322C6.88367 19.1428 7.01173 19.101 7.14092 19.1413C7.26898 19.1799 7.3528 19.283 7.32617 19.3732ZM8.25298 19.4409C8.25617 19.5343 8.14742 19.6115 8.01298 19.6134C7.87742 19.6166 7.76773 19.5408 7.76642 19.449C7.76642 19.3546 7.87292 19.2783 8.0083 19.2757C8.14273 19.2733 8.25317 19.3483 8.25317 19.4407L8.25298 19.4409ZM9.11511 19.2943C9.13123 19.3852 9.03767 19.4788 8.90398 19.5037C8.77273 19.5281 8.65086 19.4715 8.63398 19.3813C8.61786 19.2879 8.71311 19.1943 8.84436 19.1701C8.97823 19.1471 9.09823 19.2018 9.11511 19.2943Z"
                    fill="#4338CA"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_18_4394">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div onClick={() => shareToDribbble()} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M22 12C22.0017 13.3172 21.7424 14.6216 21.237 15.8379C20.7316 17.0543 19.9901 18.1584 19.0555 19.0865C18.1285 20.0118 17.0283 20.7454 15.8177 21.2454C14.6071 21.7453 13.3098 22.0017 12 22C6.47701 22 2.00001 17.523 2.00001 12C1.99651 9.43589 2.98144 6.96909 4.75001 5.11251C5.68318 4.12781 6.80747 3.34388 8.05407 2.8087C9.30068 2.27352 10.6434 1.99834 12 2.00001C13.3098 1.99831 14.6071 2.25475 15.8177 2.75466C17.0283 3.25458 18.1285 3.98817 19.0555 4.91351C19.9901 5.84162 20.7316 6.94575 21.237 8.16208C21.7424 9.37842 22.0017 10.6829 22 12Z"
                  stroke="#4338CA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 12C20.541 12 16.516 11.45 12.9135 13.0315C9.00002 14.75 6.16652 17.4155 4.93152 19.0735"
                  stroke="#4338CA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.25 2.72699C9.815 4.17149 13.23 7.84899 14.5 11.5C15.77 15.151 16.24 19.64 16.53 20.9175"
                  stroke="#4338CA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.077 10.75C3.966 10.864 8.9665 10.9665 12.1665 9.59999C15.3665 8.23349 18.12 5.71999 19.0645 4.92249M2.75 15.8065C3.63115 17.9394 5.22035 19.7036 7.25 20.802"
                  stroke="#4338CA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.00001 12C1.99651 9.43589 2.98144 6.96909 4.75001 5.11251C5.68318 4.12781 6.80747 3.34388 8.05407 2.8087C9.30068 2.27352 10.6434 1.99834 12 2.00001M16 2.83201C17.1388 3.33028 18.175 4.03613 19.0555 4.91351C19.9901 5.84162 20.7316 6.94574 21.237 8.16208C21.7424 9.37842 22.0017 10.6829 22 12C22 13.231 21.7775 14.4105 21.37 15.5M12 22C13.3098 22.0017 14.6071 21.7453 15.8177 21.2454C17.0283 20.7454 18.1285 20.0118 19.0555 19.0865"
                  stroke="#4338CA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        }
      />
      <Accordion
        title="Related articles"
        content={
          <div className="flex flex-col gap-6">
            {relatedBlogs.length <= 0 ? (
              <>
                <CardAnimation />
                <CardAnimation />
              </>
            ) : (
              <>
                {relatedBlogs.map((item: any) => (
                  <CardRelated key={item?.id} item={item?.attributes} />
                ))}
              </>
            )}
          </div>
        }
      />
    </div>
  );
};

export default LeftSide;
