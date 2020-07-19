import styled from "styled-components";
import { ArticleData } from "types/article";
interface Props {
    article: ArticleData
}

const Article = styled.div`
  h1 {
    font-size: 30px
  };
  img {
    max-width: 100%
  }
`;

const Post = (props: Props) => (
    <Article>
        <span dangerouslySetInnerHTML={{ __html: props.article.text }} />
    </Article>
);

export default Post;