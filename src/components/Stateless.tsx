const Stateless = ({colors}: { colors: string[]}) => {
    return (
        <>
            <div className="Stateless">
                <div className="Stateless__title">Text will have {colors.map((color: string) => <span key={color} style={{color: color}}>{" " + color}</span>)} colors</div>
            </div>
        </>
    )
}

export default Stateless;