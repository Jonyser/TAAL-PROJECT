import './style.css';

let audio = ""

const Audios = ({ id, data }) => {

    for (let index = 0; index < data.length; index++) {
        if (data[index].id === id) {
            audio = data[index].acf.audio.url;
        }
    }

    return (
        <>


            <div className="audio">
                <audio src={audio} controls autoPlay />

                {/* <audio
                    src={aud}
                    alt="new"
                /> */}
            </div>
        </>
    );
}
export default Audios;
//----------------------------------------
