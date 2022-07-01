<?php
/**
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * @file
 */

namespace MediaWiki\Extension\DataspectsSearch;

class Hooks implements \MediaWiki\Hook\BeforePageDisplayHook {

	/**
	 * @see https://www.mediawiki.org/wiki/Manual:Hooks/BeforePageDisplay
	 * @param \OutputPage $out
	 * @param \Skin $skin
	 */
	
	public static function onPageSaveComplete( $wikiPage ) {
		$logger = LoggerFactory::getInstance( 'dataspects' );
		$job = new DataspectsSearchFeederSendJob($wikiPage->getTitle());
		$logger->debug($wikiPage->getTitle()->mTextform);
		\JobQueueGroup::singleton()->lazyPush($job);
	}

	public static function onPageDeleteComplete( $wikiPage, $user, $reason, $id ) {
		\MediaWiki\Extension\DataspectsSearch\DataspectsSearchFeed::deleteFromDatastore($id);
	}

	public static function onPageMoveComplete( $title, $newTitle, $user, $oldid, $newid ) {
		\MediaWiki\Extension\DataspectsSearch\DataspectsSearchFeed::deleteFromDatastore($oldid);
		$job = new DataspectsSearchFeederSendJob($newTitle);
		\JobQueueGroup::singleton()->lazyPush($job);
		if($newid == 0) {
			// LEX2006041158
			// $newid = database page_id of the created redirect, or 0 if the redirect was suppressed
		}
	}

}
