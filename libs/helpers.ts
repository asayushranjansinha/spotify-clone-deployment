// Import the Price type from the custom "@/types" module
import { Price } from '@/types';

// Define a function called getURL that returns a URL string
export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';

  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;

  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;

  return url;
};

// Define an asynchronous function called postData that takes an object argument with properties url and data
export const postData = async ({
  url,
  data
}: {
  url: string;
  data?: { price: Price };
}) => {
  console.log('posting,', url, data);

  // Send a POST request to the specified URL with the following options:
  const res: Response = await fetch(url, {
    method: 'POST', // HTTP method is POST
    headers: new Headers({ 'Content-Type': 'application/json' }), // Set the content type header to application/json
    credentials: 'same-origin', // Include credentials in the request
    body: JSON.stringify(data) // Convert the data object to JSON string and include it in the request body
  });

  // If the response status is not ok (2xx), throw an error
  if (!res.ok) {
    console.log('Error in postData', { url, data, res });
    throw Error(res.statusText);
  }

  // Parse the response body as JSON and return it
  return res.json();
};

// Define a function called toDateTime that takes a number argument called secs and returns a Date object
export const toDateTime = (secs: number) => {
  var t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};
