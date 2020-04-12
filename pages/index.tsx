// ./pages/index.js
const Index = props =>
    <div>
        <h1>{props.test}</h1>
    </div>

Index.getInitialProps = ({ req }) => {
    return { test: 'Hello, world' }
}

export default Index