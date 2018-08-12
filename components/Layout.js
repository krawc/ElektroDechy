import Header from "./Header";
import Footer from "./Footer";

const layoutStyle = {
    margin: 0,
    padding: 0
};

const Layout = props => (
    <div style={layoutStyle}>
        <Header />
        {props.children}
        <Footer options={props.options}/>
    </div>
);

export default Layout;
