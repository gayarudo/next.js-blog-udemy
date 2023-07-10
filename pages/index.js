import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout, { siteTitle } from '@/components/Layout'

import Link from "next/link";
import utileStyle from "../styles/utils.module.css";
import  {getPostsData} from '@/lib/post';

//SSGの場合
export async function getStaticProps () {
  const allPostsData = getPostsData(); //id, title, data, thumbnail
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

// //SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //コンポーネントに渡すためのprops
//     },
//   };
// }

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utileStyle.headingMd}>
        <p>
          私は駆け出しエンジニアです/前職はロードサービスをしていました
        </p>
      </section>

      <section className ={`${utileStyle.headingMd} ${utileStyle.padding1px}`}>
        <h2>📝駆け出しエンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id, title, date, thumbnail}) => (
            <article key={id}>
            <Link href={`/posts/${id}`}>
              <img 
                src={`${thumbnail}`}
                className={styles.thumbnailImage}
              />
            </Link>
            <Link href={`/posts/${id}`} className={utileStyle.boldText}> {title} </Link>
            <br />
            <small className={utileStyle.lightText}>{date}</small>
          </article>
          ))}
          
        </div>
      </section>

    </Layout>
  );
}
