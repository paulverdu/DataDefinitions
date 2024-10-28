<?php

declare(strict_types=1);

/*
 * This source file is available under two different licenses:
 *  - GNU General Public License version 3 (GPLv3)
 *  - Data Definitions Commercial License (DDCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) CORS GmbH (https://www.cors.gmbh) in combination with instride AG (https://instride.ch)
 * @license    GPLv3 and DDCL
 */

namespace Instride\Bundle\DataDefinitionsBundle\Repository;

use CoreShop\Bundle\ResourceBundle\Pimcore\PimcoreDaoRepository;
use Instride\Bundle\DataDefinitionsBundle\Model\DataDefinitionInterface;

class DefinitionRepository extends PimcoreDaoRepository
{
    public function findByName(string $name): ?DataDefinitionInterface
    {
        $class = $this->metadata->getClass('model');
        $definitionEntry = new $class();
        $definitionEntry->getDao()->getByName($name);

        return $definitionEntry;
    }
}
