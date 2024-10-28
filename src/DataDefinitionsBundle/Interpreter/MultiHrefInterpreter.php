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

namespace Instride\Bundle\DataDefinitionsBundle\Interpreter;

use Instride\Bundle\DataDefinitionsBundle\Context\InterpreterContextInterface;
use Pimcore\Model\DataObject\Concrete;
use Pimcore\Tool;

class MultiHrefInterpreter implements InterpreterInterface
{
    public function interpret(InterpreterContextInterface $context): mixed
    {
        $objectClass = $context->getConfiguration()['class'];

        $class = 'Pimcore\Model\DataObject\\' . ucfirst($objectClass);

        if (Tool::classExists($class)) {
            $class = new $class();

            if ($class instanceof Concrete) {
                $ret = $class::getById($context->getValue());

                if ($ret instanceof Concrete) {
                    return [$ret];
                }
            }
        }

        return $context->getValue();
    }
}
