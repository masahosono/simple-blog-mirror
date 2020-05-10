import Posts from "../Posts";

interface Props {
    text?: string
}

export default (props: Props) => (
    <div>
        <Header />
        <Posts {...props} />
        <Footer />
    </div>
);