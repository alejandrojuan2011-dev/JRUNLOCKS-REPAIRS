$prefix = 'http://localhost:8000/'
$root = 'C:\Users\Sabeeee\Documents\New Store'
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Output "Listening on $prefix (root: $root)"

function Send-File($context, $filePath) {
    $res = $context.Response
    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
    switch ($ext) {
        '.html' { $ct = 'text/html' }
        '.css'  { $ct = 'text/css' }
        '.js'   { $ct = 'application/javascript' }
        '.jpg'  { $ct = 'image/jpeg' }
        '.jpeg' { $ct = 'image/jpeg' }
        '.png'  { $ct = 'image/png' }
        '.svg'  { $ct = 'image/svg+xml' }
        '.webp' { $ct = 'image/webp' }
        default { $ct = 'application/octet-stream' }
    }
    try {
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $res.ContentType = $ct
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } catch {
        $res.StatusCode = 500
        $msg = [System.Text.Encoding]::UTF8.GetBytes('Internal Server Error')
        $res.OutputStream.Write($msg,0,$msg.Length)
    } finally {
        $res.OutputStream.Close()
    }
}

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $req = $context.Request
    $res = $context.Response
    $urlPath = $req.Url.AbsolutePath.TrimStart('/')
    if ([string]::IsNullOrEmpty($urlPath)) { $urlPath = 'index.html' }
    $filePath = Join-Path $root $urlPath
    if (Test-Path $filePath) {
        Send-File $context $filePath
    } else {
        $res.StatusCode = 404
        $notf = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found')
        $res.OutputStream.Write($notf,0,$notf.Length)
        $res.OutputStream.Close()
    }
}
$listener.Stop()
