import Head from 'next/head'
import Image from 'next/image'
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { text } from 'stream/consumers';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [urls, setUrls] = useState();

  const generateImage = async (event: any) => {
    event.preventDefault();
    if(!event.target.elements.search.value) return;
    const configuration = new Configuration({
      organization: "org-J8Ao5OrhgS3EwoQyEB1s3afN",
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    await openai.createImage({
      prompt: event.target.elements.search.value,
      n: 1,
      size: "1024x1024",
    }).then((res: any) => {
      console.log(res.data.data[0].url);
      const newUrl: string = res.data.data[0].url;
      setUrls(newUrl);
    });

  }

  return (
    <>
      <Head>
        <title>Ai Image Processing </title>
        <meta name="description" content="Ai Image Processing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Ai Image Processing</h1>
        <form onSubmit={generateImage} className={styles.center}>
          <div className={styles.boxcontainer}>
            <textarea name="search" className={styles.inputcontainer} placeholder="a white siamese cat"></textarea>
            <button type="submit" className={styles.submitbutton}>
              Generate Image
            </button>
          </div>
        </form>

        {urls && <div className={styles.boxcontainer}>
          <Image 
            loader={urls}
            src=""
            alt="Image url"
            width={500}
            height={500}
            />
          <div className={styles.ahrehtag}>
            <a href={urls} target="_blank" rel="noreferrer"  >Visit Url</a>
          </div>
        </div>}

      </main>
    </>
  )
}
