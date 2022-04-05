export default function BoardRow(props) {
    return(
        <div className="BoardRow">
            <h2 className="title">Row</h2>
            {props.children}
        </div>

    );
}