import NextImage, { ImageProps } from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
// import ReactMarkdown from "react-markdown";
// import rehypeRaw from 'rehype-raw'

const Image = (props: ImageProps) => {
  return <NextImage {...props} />;
};

const components = {
  img: Image,
};

interface MdxProps {
  code: string;
}

export default function Mdx({ code }: MdxProps) {
  // const Component = useMDXComponent(code)
  // return <Component components={components} />
  // console.log("code", code);
  // 暂时用这个，因为用库的话会导致打包体积变大400k,无法在cloudflare pages上部署
  return <div dangerouslySetInnerHTML={{ __html: code }}></div>
  // return (
  //   <ReactMarkdown
  //     children={code}
  //     rehypePlugins={[rehypeRaw]}
  //     skipHtml={false}
  //   />
  // );
}
