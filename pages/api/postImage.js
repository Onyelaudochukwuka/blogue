const fetch = require('node-fetch');

export default async function postImages(req, res) {
    // const options = {
    //     method: 'POST',
    //     headers: {
    //         Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NTUyMzEwNDQsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmdyYXBoY21zLmNvbS92Mi9jbDN4ZW4yNHIwZmh2MDF2MDhvd2EwcXU3L21hc3RlciIsImh0dHBzOi8vbWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6ImE4YjE3YjQ3LTEyMWMtNGQ1NS04NzBkLTM5MWY4OTg4ZTAxOCIsImp0aSI6ImNsNGVodHJrbTBwcWwwMXo0OTk4ZTVuc2sifQ.QkBsVaxYhRZBupa2z063AcXKoWMN-J1Q7RGdqz2pdqic6qmwLUYaFgfFA8uK4VpA9tMLTYp0rMJuah05pbK22gJF5djKmyDTEfEOH3B6xk58lyzn9yCOdylmZzmVF2qdAYdnw61Pe_y-mK4EP7v7W680m7qFThJhnYrccXalw8lthNLvuIO_Uqf7eB8uvUjUkfXpYBdP6mySfRRtxoa6oW2_Y4Z3eQM_SVGFiwK5i5op6zKNrarYrTAUaB1VOtJkKE7FChrDeGwrvAa7Hr9UL-8e8tdjoSDvhmYu3InqJjC3c5khxLbSK8iN-qgfrGcDVyRb-e0HAJHzGtYVl6u43XXd3B91HrXmsE2-9nqaUCddhvG8E8ZZuvvio7v0wWgMuJcYu3dOLjutZEj3eU5Kl3eZjj56Fe_Z84u9pRkTxizRgKPp9n2bXN3DXsNf-YxcTNvLLnmAx6Q-BpmC_9-PgK_BaVGlsMSMpPntgLdte9L5mPOkElxvU7M1Z_2VYekyUlrzQL1Y442f841PZxQ6dzroBSCAYPn8jB_3G75P_g8Pc0uWoApzVxPTKgEx2pIVCWZGLOYPgQEmaRhBd3Hy1BA-W8lCZLjQBJLyW-qnCxe19jzHcns9MXGiyAKXpRAwIclA7INbE7z6jGqgrXZopkonESPY0a1lquOiNkG0WzI',
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     body: `url=${encodeURIComponent(
    //         'https://www.gwclimited.com/static/media/germanybg.45cd9e9cce5d542c6acf.jpeg'
    //     )}`,
    // };

    // fetch('https://api-ap-south-1.graphcms.com/v2/cl3xen24r0fhv01v08owa0qu7/master/upload', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    const form = new FormData();

    form.append('fileUpload', fs.createReadStream('path/to/file.png'));

    fetch(`${process.env.GRAPHCMS_URL}/upload`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.GRAPHCMS_ASSET_TOKEN}`,
        },
        body: form,
    });
}