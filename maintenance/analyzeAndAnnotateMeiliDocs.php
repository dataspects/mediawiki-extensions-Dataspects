<?php

# https://www.mediawiki.org/wiki/Composer/For_extensions#Installing_extensions

namespace MediaWiki\Extension\Dataspects;


$basePath = getenv( 'MW_INSTALL_PATH' ) !== false ? getenv( 'MW_INSTALL_PATH' ) : __DIR__ . '/../../..';
require_once $basePath . '/maintenance/Maintenance.php';

class AnalyzeAndAnnotateMeiliDocs extends \Maintenance {

    public function __construct() {
		parent::__construct();
        require_once __DIR__."/../src/AnalyzeAndAnnotateMeiliDocsJob.php";
        foreach (glob(__DIR__."/../src/jobs/*.php") as $filename) {
            require_once $filename;
        }
        $this->addOption( 'status', 'Show jobs and their methods', false );
        $this->addOption( 'job', 'Job to execute', false );
        $this->addOption( 'doWrite', 'Write to Meilisearch?', false );
		$this->requireExtension( 'Dataspects' );
	}

	public function execute() {

        /**
         * Status
         */
        $status = $this->getOption( 'status', false );
        if($status === 'true') {
            echo $this->status();
        }

        /**
         * Jobs
         */
        $job = $this->getOption( 'job', false );
        if($job) {
                        
            $doWrite = $this->getOption( 'doWrite', false );

            echo "Running '$job' with option 'doWrite=$doWrite'\n";

            $jobClass = "MediaWiki\Extension\Dataspects\AnalyzeJobs\\$job";
            if(class_exists($jobClass)) {
                $jobInstance = new $jobClass($doWrite);
                $jobInstance->execute();
            } else {
                echo "WARNING: Job '$job' not found\n";
            }

        }
        
	}

    private function status() {
        $analyzeJobs = [];
        foreach (get_declared_classes() as $declaredClass) {
            if($this->startsWith($declaredClass, "MediaWiki\Extension\Dataspects\AnalyzeJobs\\")) {
                $dcp = explode("\\", $declaredClass);
                $analyzeJobs[end($dcp)] = get_class_methods($declaredClass);
            }
        }
        return json_encode($analyzeJobs);
    }

    private function startsWith( $haystack, $needle ) {
        $length = strlen( $needle );
        return substr( $haystack, 0, $length ) === $needle;
    }

}

$maintClass = AnalyzeAndAnnotateMeiliDocs::class;

require_once RUN_MAINTENANCE_IF_MAIN;
