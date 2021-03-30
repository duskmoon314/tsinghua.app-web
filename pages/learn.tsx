import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { Container } from "@material-ui/core";
import axios from "axios";
import { markdownToHtml } from "lib/markdown";

interface LearnXProps {
  content: string;
}

const LearnX: React.FC<LearnXProps> = ({ content }) => {
  return (
    <>
      <NextSeo
        title="learnX - 清华大学网络学堂 App"
        description="清华大学网络学堂 App，以 React Native 构建"
      />
      <Container
        sx={{
          py: 8,
          '& img[alt~="screenshot"]': {
            maxWidth: "100%",
            height: {
              xs: "auto",
              sm: 320,
            },
          },
        }}
        maxWidth="sm"
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </>
  );
};

export default LearnX;

export const getStaticProps: GetStaticProps<LearnXProps> = async () => {
  const response = await axios.get(
    "https://raw.githubusercontent.com/robertying/learnX/main/README.md"
  );
  const md = response.data as string;

  const html = await markdownToHtml(md);

  const content = html.replace(
    /(src|href)="(?!https:|http:)(.*?)"/gi,
    `$1="https://cdn.jsdelivr.net/gh/robertying/learnX@main/$2"`
  );

  return {
    props: {
      content,
    },
    revalidate: 1 * 60 * 60,
  };
};
