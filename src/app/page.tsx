export default function Page() {
    const gifUrl = "https://i.pinimg.com/originals/57/61/5b/57615b8c0092a66c1d4058b1692955cc.gif"; // Replace with your actual GIF URL

    return (
        <div className="">
            Pagrindinis puslapis 
            <img src={gifUrl} alt="Description of GIF" /> {/* Add this line */}
        </div>
    );
}
