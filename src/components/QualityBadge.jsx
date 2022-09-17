import Badge from "react-bootstrap/Badge"

const QualityBadge = (props) => (
    <Badge style={{color: props.color === "dark" ? "white" : "black"}} className="w-100" bg={props.color}>{props.quality}</Badge>
)

export default QualityBadge