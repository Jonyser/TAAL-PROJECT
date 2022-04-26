import './style.css';
import Image from 'react-bootstrap/Image'
let image = ""
const Images = ({ id, data }) => {

    for (let index = 0; index < data.length; index++) {
        if (data[index].id === id) {
            image = data[index].acf.image.url;
        }
    }
    return (
        <>
            <div className="images">
                <Image
                    src={image}
                    alt="new"
                />
            </div>
        </>
    );
}
export default Images;
//----------------------------------------
