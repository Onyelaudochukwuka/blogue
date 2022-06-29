const form = new FormData();
export default async function comments(req, res) {

    form.append('fileUpload', fs.createReadStream(req.value));

    fetch(`${process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT}/upload`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
        },
        body: form,
    });
}