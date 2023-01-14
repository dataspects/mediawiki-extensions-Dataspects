<?php

function startsWith( $haystack, $needle ) {
    $length = strlen( $needle );
    return substr( $haystack, 0, $length ) === $needle;
}

require_once __DIR__."/../src/AnalyzeAndAnnotateMeiliDocsJob.php";
foreach (glob(__DIR__."/../src/jobs/*.php") as $filename) {
    require_once $filename;
}

$analyzeJobs = [];
foreach (get_declared_classes() as $declaredClass) {
    if(startsWith($declaredClass, "MediaWiki\Extension\Dataspects\AnalyzeJobs\\")) {
        $dcp = explode("\\", $declaredClass);
        $analyzeJobs[] = [end($dcp) => get_class_methods($declaredClass)];
    }
}
print_r($analyzeJobs);